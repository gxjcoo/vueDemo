<template>
  <div id="app">
    <h1>多页面展示</h1>
    <h2>config文件中加入一下代码，按照代码进行目录构建</h2>
    <p>
    pages:{
        index:{
            entry:'src/main.js',
            template:'public/index.html'
        },
	    page:'src/multiPage/page2.js',
},
    </p>
  </div>
</template>

<script>
export default {
  name: 'page1'
}
</script>