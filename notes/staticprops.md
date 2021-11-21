client side fetched data is staticcally optimized, not server-side. if your data source is changin alot dont use staticpops. use serverside props or fetch data client-side.

## Prerendering

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO. Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.) If you disable js in browser, you will still get some content.
Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.
<Static Generation> is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
<Server-side Rendering> is the pre-rendering method that generates the HTML on each request.

## When to Use Static Generation v.s. Server-side Rendering

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation. On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!” sindce this runs on server,we cannot use browser-side fetching libraries.

## GetStaticProps

this is called during the build time. when you naviigate from page u will get same data. so it will fetch during the build data. it will create static page with dynamic data.
