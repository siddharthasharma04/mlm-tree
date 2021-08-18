fetch('https://siddharthasharma04.github.io/mlm-tree/data.json').then((res) => res.json()).then(data => {
    formatData(data);
})


const formatData = (data) => {
    const _d = [...data];
    const val = _d.splice(0, 1)[0];
    const tree = trace(val, _d);
    console.log(JSON.stringify(tree));
    treeMaker(tree, {
        id: 'j_tree', card_click: function (element) {
            console.log(element);
        },
        treeParams: data.reduce((b, a) => (b[a.id] = { trad: `<span>${a.name} <br><strong>(${a.registration_type})</strong></span>` }, { ...b }), {}),
        'link_width': '4px',
        'link_color': '#2199e8',
    });

}

const hasChild = (val, tree) => (tree.some((v) => (v.pid === val.id)));

const trace = (val, tree) => {
    const out = {};
    if (tree.length && hasChild(val, tree)) {
        const child = tree.filter(d => d.pid === val.id);
        const t = tree.filter(d => d.pid !== val.id);
        out[val.id] = {};
        child.forEach(ele => {
            const tr = trace(ele, t);
            out[val.id][ele.id] = tr[ele.id] ? tr[ele.id] : "";
        });
    } else {
        return "";
    }
    return out;
}
