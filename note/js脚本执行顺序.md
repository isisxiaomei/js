# 执行顺序

```html
<!-- 示例1： -->
// 此时是获取不到的btn的，因为解析器从上往下解析，先执行script脚本，再展示btn
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script>
    console.log(document.querySelector('.btn'));
</script>
<body>
    <button class="btn">click me</button>
</body>
</html>


<!-- 示例： -->
// 此时是可以获取到btn的，因为解析器从上往下解析，先展示btn，再执行script脚本
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">click me</button>
</body>
<script>
    console.log(document.querySelector('.btn'));
</script>
</html>
```



