function showrecentcomments(json) {
  for (var i = 0; i < a_rc; i++) {
    var entry = json.feed.entry[i];
    var commentLink;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        commentLink = entry.link[k].href;
        break;
      }
    }
    commentLink = commentLink.replace("#", "#comment-");
    var postLink = commentLink.split("#")[0];
    var postTitle = entry.title.$t;
    var publishedDate = entry.published.$t;
    var year = publishedDate.substring(0, 4);
    var month = publishedDate.substring(5, 7);
    var day = publishedDate.substring(8, 10);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var commentContent = ("content" in entry) ? entry.content.$t : ("summary" in entry) ? entry.summary.$t : "";
    commentContent = commentContent.replace(/<\S[^>]*>/g, "");
    document.write('<div class="rcw-comments">');
    if (m_rc == true) document.write('tại ' + months[parseInt(month, 10) - 1] + ' ' + day + ' ');
    document.write('<a href="' + commentLink + '">' + entry.author[0].name.$t + '</a> vừa bình luận');
    if (n_rc == true) document.write(' tại <a href="' + postLink + '">' + postTitle + '</a>');
    if (o_rc > 0) {
      document.write(': ');
      if (commentContent.length < o_rc) {
        document.write('<i>' + commentContent + '</i>');
      } else {
        var trimmedContent = commentContent.substring(0, o_rc);
        var lastSpace = trimmedContent.lastIndexOf(" ");
        trimmedContent = trimmedContent.substring(0, lastSpace);
        document.write('<i>' + trimmedContent + '&hellip;</i>');
      }
    }
    document.write('</div>');
  }
}
