// Tomato Project
function showrecentcomments(json) {
    for (var i = 0; i < a_rc; i++) {
        var b_rc = json.feed.entry[i];
        var c_rc;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < b_rc.link.length; k++) {
            if (b_rc.link[k].rel == 'alternate') {
                c_rc = b_rc.link[k].href;
                break;
            }
        }
        c_rc = c_rc.replace("#", "#comment-");
        var d_rc = c_rc.split("#");
        d_rc = d_rc[0];
        var e_rc = d_rc.split("/");
        e_rc = e_rc[5];
        e_rc = e_rc.split(".html");
        e_rc = e_rc[0];
        var f_rc = e_rc.replace(/-/g, " ");
        f_rc = f_rc.link(d_rc);
        if ("content" in b_rc) {
            var l_rc = b_rc.content.$t;
        } else if ("summary" in b_rc) {
            var l_rc = b_rc.summary.$t;
        } else var l_rc = "";
        var re = /<\S[^>]*>/g;
        l_rc = l_rc.replace(re, "");
        document.write('<div class="rcw-comments">');
        document.write('<a href="' + c_rc + '">' + b_rc.author[0].name.$t + '</a> đã bình luận');
        document.write(': ');
        if (l_rc.length < o_rc) {
            document.write('<i>');
            document.write(l_rc);
            document.write('</i></div>');
        } else {
            document.write('<i>');
            l_rc = l_rc.substring(0, o_rc);
            var p_rc = l_rc.lastIndexOf(" ");
            l_rc = l_rc.substring(0, p_rc);
            document.write(l_rc + '&hellip;</i></div>');
            document.write('');
        }
    }
}
