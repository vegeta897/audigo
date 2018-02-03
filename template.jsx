export default ({ content }) => {
    return `<!doctype html>
<html>
<head>
	<title>Hey i was a server once</title>
</head>
<body>
	<div id="root">${content}</div>
	<script src="/js/main.js" async></script>
</body>
</html>`;
};