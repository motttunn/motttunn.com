<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <script>
      if (navigator.userAgent.indexOf('iPad') > 0)
      { document.write('<meta name="viewport" content="width=1024, maximum-scale=2, user-scalable=yes">'); }
      else
      { document.write('<meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=2, user-scalable=yes">'); }
    </script>
    <title>News | motttunn.com</title>
    <meta name="description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:url" content="https://motttunn.com/news/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="News | motttunn.com">
    <meta property="og:site_name" content="News | motttunn.com">
    <meta property="og:description" content="web制作に関する備忘録およびポートフォリオサイトです。">
    <meta property="og:image" content="">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="">
    <link rel="canonical" href="https://motttunn.com/news/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/news/style.css?hash=9724349">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="new-Archive">
        <div class="new-Archive_Box">
          <h2 class="sw-Title"><span>News</span></h2>
          <div class="st-Posts st-Posts-Index">
            <ul class="st-Posts_List">
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
              <li class="st-Posts_List_Item"><a class="Item-Anchor" href="#">
                  <p class="Item_Date">2019.00.00</p><img class="Item_Thumbnail">
                  <h3 class="Item_Title">テキスト1テキスト2テキスト3テキスト4テキスト5テキスト1テキスト2テキスト3テキスト4</h3></a></li>
            </ul>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/news/app.bundle.js?hash=9724349"></script>
    <?php wp_footer(); ?>
  </body>
</html>