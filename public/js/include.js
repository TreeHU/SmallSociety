

$(document).ready(function(){

	/* html 파일에 meta 태그들을 추가합니다 */
	var meta1 = '<meta charset="utf-8">';
	var meta2 = '<meta name="viewport" content="width=device-width, initial-scale=1">';
	var meta3 = '<meta name="Description" content="작은사회가 만들어가는 새로운 미래를 미리 살펴보고, 세상의 변화를 이끄는 작은사회의 일원이 될 수 있습니다." />';
	var meta4 = '<meta property="og:title" content="작은사회" />';
	var meta5 = '<meta property="og:description" content="작은사회가 제시하는 새로운 미래를 미리 살펴보고, 세상의 변화를 이끄는 작은사회의 일원이 될 수 있습니다." />';
	var meta6 = '<meta property="og:url" content="http://www.smallsociety.kr/" />';
	var meta7 = '<meta property="og:locale" content="ko_KR" />';
	var meta8 = '<meta property="og:image" content="./images/open_graph_logo.png" />';
	var meta9 = '<meta property="og:type" content="website" />';
	var meta10 = '<meta property="og:site_name" content="작은사회" />';
	$("head").append(meta1, meta2, meta3, meta4, meta5, meta6, meta7, meta8, meta9, meta10);

	/* html 파일에 header.html 파일로 작성된 header를 추가합니다. */
	$("header").load("/header.html");
	/* html 파일에 footer.html 파일로 작성된 footer를 추가합니다. */
	$("footer").load("/footer.html");

});
