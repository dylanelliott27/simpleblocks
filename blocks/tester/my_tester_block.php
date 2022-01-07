<?php

function my_tester_block_template() {
    ob_start();
    ?>
        <section style="width: 100%; height: 300px; background-color: red;">
            <h2>Hey</h2>
        </section>
    <?php
    return ob_get_clean();
}