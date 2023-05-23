import React from "react"
import { Helmet } from 'react-helmet';

export function ChatWidget() {

    const scriptString = "var FreeScoutW={s:{'color':'#295524','position':'br','locale':'en','show_categories':'1','id':3765176496}};(function(d,e,s){if(d.getElementById('freescout-w'))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id='freescout-w';a.src=s;m.parentNode.insertBefore(a, m)})(document,'script','https://help.hummingbirdhammocks.com/modules/knowledgebase/js/widget.js?v=2141');"

    return (
        <Helmet>
            <script type="text/javascript" src="https://quickchat.ai/user_kit/quickchat8vqb7j.js" id="quickchat_script" scenario_id="2njqzwbq1u"></script>
        </Helmet>
    )
}