<?php
namespace app\core\base;

use extpoint\yii2\base\Controller;
use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;

class AppController extends Controller {
    protected function renderApp($config = [])
    {
        $jiiConfig = [
//            'application' => [
//                'modules' => [
//                    'site' => [
//                        'csrfToken' => Yii::$app->request->getCsrfToken(),
//                    ]
//                ],
//            ],
        ];

        $jiiConfig = ArrayHelper::merge($jiiConfig, $config);
        Yii::$app->clientApplication->register([
            'application' => [
                'components' => [
                    'bundleLoader' => [
                        'autoStart' => true,
                    ],
                ],
            ],
        ]);
        Yii::$app->clientApplication->loadBundle('countries', $jiiConfig);

        return $this->renderContent(Html::tag('div', '', ['id' => 'app-' . Yii::$app->id]));
    }

}
