<?php

namespace app\views;

use extpoint\megamenu\MegaMenu;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;

/* @var $this \yii\web\View */
/* @var $content string */

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= \Yii::$app->language ?>">
<head>
    <meta charset="<?= \Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= \Yii::$app->megaMenu->getFullTitle() ?></title>
    <?php $this->head() ?>
    <?= Html::jsFile('@web/assets/bundle-index.js') ?>
    <?= Html::jsFile('@web/assets/bundle-style.js') ?>
</head>
<body>

<?php $this->beginBody() ?>
    <div class="wrap">
        <?php
            NavBar::begin([
                'brandLabel' => 'Countries Match',
                'brandUrl' => \Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-static-top',
                ],
            ]);
            echo Nav::widget([
                'options' => ['class' => 'navbar-nav navbar-right'],
                'items' => \Yii::$app->megaMenu->getMenu(null, 1),
            ]);
            NavBar::end();
        ?>

        <div class="container">
            <?= Breadcrumbs::widget([
                'links' => \Yii::$app->megaMenu->getBreadcrumbs(),
            ]) ?>
            <?php
                foreach (\Yii::$app->session->getAllFlashes() as $key => $messages) {
                    $messages = is_array($messages) ? $messages : [$messages];
                    foreach ($messages as $message) {
                        echo '<div class="alert alert-' . $key . '">' . $message . '</div>';
                    }
                }
            ?>
            <?= $content ?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; <?= \Yii::$app->name ?> <?= date('Y') ?></p>
            <p class="pull-right"></p>
        </div>
    </footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
