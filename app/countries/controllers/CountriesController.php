<?php

namespace app\countries\controllers;

use app\core\base\AppController;

class CountriesController extends AppController
{
    public function actionIndex()
    {
        return $this->renderApp();
    }

}
