
<?php
  if(have_posts()):
  while(have_posts()): the_post();
  $post_meta_desc      = esc_html(get_the_excerpt());
  $post_meta_thumb_id  = get_post_thumbnail_id();
  $post_meta_thumb_url = wp_get_attachment_image_src($post_meta_thumb_id, true);
  $post_meta_thumb_url = esc_url($post_meta_thumb_url[0]);
  endwhile;
  endif;
?>
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
    <title><?php the_title(); ?> | Portfolio | motttunn.com</title>
    <meta name="description" content="<?php echo $post_meta_desc; ?>">
    <meta property="og:url" content="https://motttunn.com/portfolio/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php the_title(); ?> | Portfolio | motttunn.com">
    <meta property="og:site_name" content="<?php the_title(); ?> | Portfolio | motttunn.com">
    <meta property="og:description" content="<?php echo $post_meta_desc; ?>">
    <meta property="og:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <meta property="og:locale" content="ja_JP">
    <meta property="fb:app_id" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://motttunn.com/wp/wp-content/themes/motttunn/assets/images/common/ogp.png">
    <link rel="canonical" href="https://motttunn.com/portfolio/">
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/favicon.ico" type="image/vnd.microsoft.icon">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/common/apple-touch-icon.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400">
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/portfolio/style.css?hash=5715891">
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="st-Container">
      
      <?php get_header(); ?>
      <section class="st-Detail">
        <div class="st-Detail_Box">
          <h2 class="sw-Title"><a href="<?php echo home_url(); ?>/portfolio/">Portfolio</a></h2>
          <div class="st-Detail_Box_Content">
            <h3 class="Content_Title"><?php the_title(); ?></h3>
            <p class="Content_Date"><?php the_field('portfolio_date'); ?></p>
            <figure class="Content_Thumbnail"><?php the_post_thumbnail(); ?></figure>
            <div class="Content_Link">
              <ul class="Content_Link_List">
                <li class="Content_Link_List_Item Content_Link_List_Item-Page"><a class="Item_Button" href="<?php the_field('portfolio_url_page'); ?>" target="_blank">Page</a></li>
                <li class="Content_Link_List_Item Content_Link_List_Item-Github"><a class="Item_Button" href="<?php the_field('portfolio_url_github'); ?>" target="_blank">Github</a></li>
              </ul>
            </div>
            <div class="Content_Text">
              <?php the_content(); ?>
              <?php if(get_field('portfolio_point_good')): ?>
              <h4>頑張ったポイント</h4>
              <ul class="Content_Text_List">
                <?php
                  $good_text  = get_field('portfolio_point_good');
                  $good_array = explode("\n", $good_text);
                  $good_array = array_map('trim', $good_array);
                  $good_array = array_filter($good_array, 'strlen');
                  $good_array = array_values($good_array);
                  foreach($good_array as $good_item):
                  echo '<li class="Content_Text_List_Item"><p>・' . $good_item . '</p></li>';
                  endforeach;
                ?>
              </ul><?php
                endif;
                if(get_field('portfolio_point_bad')):
              ?>
              <h4>改善したいポイント</h4>
              <ul class="Content_Text_List">
                <?php
                  $bad_text  = get_field('portfolio_point_bad');
                  $bad_array = explode("\n", $bad_text);
                  $bad_array = array_map('trim', $bad_array);
                  $bad_array = array_filter($bad_array, 'strlen');
                  $bad_array = array_values($bad_array);
                  foreach($bad_array as $bad_item):
                  echo '<li class="Content_Text_List_Item"><p>・' . $bad_item . '</p></li>';
                  endforeach;
                ?>
              </ul><?php endif; ?>
            </div>
            <div class="Content_PrevNext">
              <?php
                $item_current = get_the_permalink();
                $item_prev    = get_permalink(get_adjacent_post(false, '', true));
                $item_next    = get_permalink(get_adjacent_post(false, '', false));
                if($item_prev !== $item_current):
              ?><a class="Content_PrevNext_Prev" href="<?php echo $item_prev; ?>"><<　Prev</a><?php endif; if($item_next !== $item_current): ?><a class="Content_PrevNext_Next" href="<?php echo $item_next; ?>">Next　>></a><?php endif; ?>
            </div>
          </div>
        </div>
      </section>
      <?php get_footer(); ?>
    </div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/lib.min.js?hash=5715891"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/portfolio/app.bundle.js?hash=5715891"></script>
    <?php wp_footer(); ?>
  </body>
</html>