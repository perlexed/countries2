<?php

namespace app\jsonRpc\helpers;

use app\jsonRpc\exceptions\Exception;

class Helper
{
    /** @var array Use as 'result' when method returns null */
    private static $defaultResult = [
        "success" => true
    ];

    /**
     * Formats and returns
     * @param null $result
     * @param \Exception|null $error
     * @param null $id
     * @return array
     */
    public static function formatResponse ($result = null, \Exception $error = null, $id = null)
    {
        $resultKey = 'result';

        if (!empty($error)) {
            $resultKey = 'error';

            if (is_subclass_of($error, Exception::class)) {
                /** @var Exception $error */
                $resultValue = $error->toArray();
            } else {
                $resultValue = $error->getMessage();
            }
        }
        else if (null === $result)
            $resultValue = self::$defaultResult;
        else
            $resultValue = $result;

        return [
            'jsonrpc' => '2.0',
            $resultKey => $resultValue,
            'id' => $id,
        ];
    }
}