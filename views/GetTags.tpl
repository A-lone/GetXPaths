<html>
<head>
    <title>GetTAGS</title>
    <script src="{{ get_url('static', filename='jquery-1.9.1.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', filename='jquery-ui-1.10.3.custom.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', filename='highlighting.js') }}" type="text/javascript"></script>
	<script src="{{ get_url('static', filename='GetTags.js') }}" type="text/javascript"></script>
	<link href="{{ get_url('static', filename='GetTags.css') }}" rel="stylesheet" type="text/css" />

</head>
<body>
<div id="output_DataToDB" class="float_menus"><u>XPaths history:</u><br></div>
<div id="output_code" class="float_menus">
    Hey, please select the:
    <i><div id="quest">
    </div></i>
    and press <b>ENTER</b>
    <br><br> <b>XPath:</b><br>
    <div id="selected_xpath"></div><hr>
    <div id="GetByURL"><input id="GetByURL_input"><br><button id="GetByURL_button">Get Page By URL</button> </div>
</div>
<div id="output_view"></div>
</body>
</html>