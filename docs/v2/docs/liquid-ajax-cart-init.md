---
title: liquidAjaxCart.init
layout: docs-v2
---

# liquidAjaxCart.init

<p class="lead" markdown="1">
A boolean read-only property which is `false` once Liquid Ajax Cart is loaded.
It becomes `true` when Liquid Ajax Cart is successfully initialized.
</p>

## Use case

Use this property along with the [`liquid-ajax-cart:init`](/v2/docs/event-init/) event 
when you want to run your JavaScript once Liquid Ajax Cart is initialized.

{% include v2/content/init-event-example.html %}