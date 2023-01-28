import {baseUri} from "src/apis/api"


function fullLink(link: string) {
    if (!link) return ""

    if (link.startsWith("http")) {
        return link
    } else {
        let a = link.indexOf("phone_mela")

        if (a !== -1) {
            return baseUri + "/" + link.slice(a + 11)
        } else {
            return link
        }
    }

}

export default fullLink
