function showrecentcomments(json) {
    json.feed.entry.forEach(entry => {
        var commentLink = entry.link.find(link => link.rel === 'alternate').href.replace("#", "#comment-");
        var commentText = ("content" in entry) ? entry.content.$t : ("summary" in entry) ? entry.summary.$t : "";
        commentText = commentText.replace(/<\S[^>]*>/g, "");

        document.write('<div class="rcw-comments">');
        document.write('<a href="' + commentLink + '">' + entry.author[0].name.$t + '</a> đã bình luận');
        document.write(': ');
        
        if (commentText.length < o_rc) {
            document.write('<i>' + commentText + '</i></div>');
        } else {
            var truncatedText = commentText.substring(0, o_rc).trim().replace(/ \w*$/, "");
            document.write('<i>' + truncatedText + '&hellip;</i></div>');
        }
    });
}
