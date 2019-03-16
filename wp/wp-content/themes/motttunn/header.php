
<header class="st-Header">
  <button class="st-Header_Button" id="st-Header_Button">MENU</button>
  <nav class="st-Header_Nav st-Header_Nav-Hidden" id="st-Header_Nav">
    <ul class="st-Header_Nav_List">
      <li class="st-Header_Nav_List_Item st-Header_Nav_List_Item-Close sp_b" id="st-Header_Nav_List_Item-Close">
        <button class="Item-Anchor">×</button>
      </li>
      <li class="st-Header_Nav_List_Item <?php if(is_home()){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/">HOME</a></li>
      <li class="st-Header_Nav_List_Item <?php if(is_page('news')){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/news/">NEWS</a></li>
      <li class="st-Header_Nav_List_Item <?php if(is_page('portfolio')){ echo 'st-Header_Nav_List_Item-Current'; } ?>"><a class="Item-Anchor" href="<?php echo home_url(); ?>/portfolio/">PORTFOLIO</a></li>
    </ul>
  </nav>
</header>