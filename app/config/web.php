<?php

return \yii\helpers\ArrayHelper::merge(
    require 'main.php',
    [
        'defaultRoute' => 'site/site/index',
        'components' => [
            'request' => [
                'cookieValidationKey' => 'J*hkGElbm\2jLJXIVj:@4K33ij&D*~ra',
            ],
            'user' => [
                'class' => '\app\core\components\ContextUser',
                'identityClass' => 'app\core\models\User',
                'enableAutoLogin' => true,
            ],
            'errorHandler' => [
                'errorAction' => 'site/site/error',
            ],
            'clientApplication' => [
                'class' => '\app\core\components\ClientApplication',
            ],
        ],
    ]
);