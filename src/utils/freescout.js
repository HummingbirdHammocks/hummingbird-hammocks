import axios from "axios";
import React from "react"
import { Helmet } from 'react-helmet';

export async function getUserTickets(email) {
    if (!email) {
        return false
    }

    return await axios.get(process.env.GATSBY_FIREBASE_FUNCTIONS_URL + "/api/v1/freescout/get_tickets/" + email)
}

export function HelpWidgetScripts() {
    const scriptString = "var FreeScoutW={s:{'color':'#295524','position':'br','locale':'en','show_categories':'1','id':3765176496}};(function(d,e,s){if(d.getElementById('freescout-w'))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id='freescout-w';a.src=s;m.parentNode.insertBefore(a, m)})(document,'script','https://help.hummingbirdhammocks.com/modules/knowledgebase/js/widget.js?v=2141');"

    return (
        <Helmet>
            <script>{scriptString}</script>
        </Helmet>
    )
}