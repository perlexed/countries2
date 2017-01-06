<?php

namespace app\jsonRpc\controllers;

use app\core\base\AppController;
use app\profile\enums\UserLanguage;
use Yii;
use yii\base\InvalidParamException;
use yii\helpers\Json;
use app\jsonRpc\helpers\Helper;
use app\jsonRpc\exceptions\Exception;
use yii\web\HttpException;
use yii\web\Response;

/**
 * Class ApiController
 *
 * Class handles JSON-RPC 2.0 API requests, parses then, and then runs corresponding actions with provided parameter
 * Note that in order to call a controller's action, you need give it proper permission, for example in MegaMenu
 * configuration you can add the following:
 *  [
 *      'allow' => true,
 *      'actions' => [ACTION_NAME],
 *      'roles' => ['?'],
 *  ]
 *
 * Also, action's controller is using it's own CSRF validation rules, so if validation is enable, you need to pass
 * CSRF token in the JSON-RPC headers
 *
 *
 * @package app\jsonRpc\controllers
 */
class ApiController extends AppController
{
    public $enableCsrfValidation = false;

    /** @var array Contains parsed JSON-RPC 2.0 request array */
    protected $requestData;

    /**
     * API entry point. JSON parsing and batch request processing
     *
     * @return array|null|Response
     */
    public function actionIndex()
    {
        try {
            $requestData = Json::decode(file_get_contents('php://input'), true);
        } catch (InvalidParamException $e) {
            $requestData = null;
        }

        $isBatch = is_array($requestData) && isset($requestData[0]['jsonrpc']);
        $requests = $isBatch ? $requestData : [$requestData];
        $resultData = null;

        if (empty($requests)) {
            $isBatch = false;
            $resultData = [Helper::formatResponse(null, new Exception("Invalid Request", Exception::INVALID_REQUEST))];
        } else {
            foreach ($requests as $request) {
                if($response = $this->getActionResponse($request)) {
                    $resultData[] = $response;
                }
            }
        }

        $response = Yii::$app->getResponse();
        $response->format = Response::FORMAT_JSON;
        $response->data = $isBatch || null === $resultData ? $resultData : current($resultData);
        return $response;
    }

    /**
     * Extracts parameters out of singe JSON-RPC request and runs $requestData['method'] action
     *
     * @param array $requestData
     * @return array|null
     */
    public function getActionResponse($requestData)
    {
        $this->requestData = $result = $error = null;
        try {
            $this->parseAndValidateRequestData($requestData);

            ob_start();
            $result = Yii::$app->runAction($this->requestData['method'], $this->requestData['params']);
            ob_clean();

        } catch (HttpException $e) {
            $error = $e;
        } catch (Exception $e) {
            $error = $e;
        } catch (\Exception $e) {
            $error = new Exception("Internal error: " . $e->getMessage(), Exception::INTERNAL_ERROR);
        }

        if (!isset($this->requestData['id']) && (empty($error) || !in_array($error->getCode(), [Exception::PARSE_ERROR, Exception::INVALID_REQUEST]))) {
            return null;
        }

        return Helper::formatResponse($result, $error, isset($this->requestData['id'])? $this->requestData['id'] : null);
    }

    /**
     * Try to decode input json data and validate for required fields for JSON-RPC 2.0
     *
     * @param $requestData string
     * @throws Exception
     */
    protected function parseAndValidateRequestData($requestData)
    {
        if (null === $requestData) {
            throw new Exception("Parse error", Exception::PARSE_ERROR);
        }

        if (!isset($requestData['jsonrpc']) || $requestData['jsonrpc'] !== '2.0'
            || empty($requestData['method']) || "string" != gettype($requestData['method'])
        ) {
            throw new Exception("Invalid Request", Exception::INVALID_REQUEST);
        }

        $this->requestData = $requestData;
        if (!isset($this->requestData['params'])) {
            $this->requestData['params'] = [];
        }
    }
}