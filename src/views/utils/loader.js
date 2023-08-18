import m from "mithril";


class Loader {
    view() {
        return [
            m("div.placeholder-paragraph", [
                m("div.line"),
                m("div.line")
            ])
        ]
    }
}

export default Loader;
