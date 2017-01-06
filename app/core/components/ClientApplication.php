<?php

namespace app\core\components;

use app\core\CoreModule;
use Yii;
use yii\base\Component;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;
use yii\web\View;

class ClientApplication extends Component
{
    const JS_KEY_PREFIX = 'jii-client-application-';

    protected $config;

    /**
     * @inheritdoc
     */
    public function register($config = []) {
        if ($this->config === null) {
            $this->config = $this->getDefaultConfig();
        }
        $this->config = ArrayHelper::merge($this->config, $config);

        Yii::$app->view->registerJs('window.JII_CONFIG = ' . Json::htmlEncode($this->config) . ';', View::POS_HEAD, static::JS_KEY_PREFIX . 'config');
    }

    public function loadBundle($bundleName, $config = [], $jsHandler = '') {
        $this->register();
        Yii::$app->view->registerJs(
            'Jii.app.bundleLoader.load(' . Json::encode($bundleName) . ', ' . Json::htmlEncode($config) . ').then(function() {' . $jsHandler . '});',
            View::POS_END,
            static::JS_KEY_PREFIX . $bundleName
        );
    }

    protected function getDefaultConfig() {
        return [
            'application' => [
                'id' => Yii::$app->id,
                'components' => [
                    'rpc' => [
                        'csrfToken' => Yii::$app->request->getCsrfToken(),
                    ],
                    'bundleLoader' => [
                        'assetsPath' => Yii::getAlias('@web/assets'),
                    ],
                ],
            ],
            'user' => [
                // TODO Сделать на клиенте компонент ContextUser и туда это скормить
                'role' => \Yii::$app->user->model ? \Yii::$app->user->model->role : '',
                'email' => \Yii::$app->user->model ? \Yii::$app->user->model->email : 0
            ],
        ];
    }

}