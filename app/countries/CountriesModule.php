<?php

namespace app\countries;

use app\core\base\AppModule;

class CountriesModule extends AppModule {

    public function coreMenu() {
        return [
            [
                'label' => 'Countries',
                'url' => ["/countries/countries/index"],
                'urlRule' => '',
            ],
//            [
//                'label' => 'О сайте',
//                'url' => ["/$this->id/site/about"],
//                'urlRule' => 'about',
//                'order' => -50,
//            ],
//            [
//                'label' => 'Ошибка',
//                'url' => ["/$this->id/site/error"],
//                'visible' => false,
//            ],
//            [
//                'label' => 'Gii',
//                'url' => ["/gii/default/index"],
//                'visible' => \Yii::$app->hasModule('gii'),
//                'order' => 90,
//            ],
        ];
    }

}