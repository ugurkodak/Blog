require("bootstrap");

//newtopic.ejs
function toggleTopicInput() {
    if ($("#selectTopic").val() == "new") {
	$("#topicTitle").show();
	$("#topicDescription").show();
    }
    else {
	$("#topicTitle").hide();
	$("#topicDescription").hide();
    }
}
