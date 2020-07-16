// [ 5, 1, 7 ] 
const treeA = {
    "val": 5,
    "left": {
        "val": 1,
        "left": null,
        "right": null
    },
    "right": {
        "val": 7,
        "left": null,
        "right": null
    }
};

// [ 10, 12 ] true
const treeB = {
    "val": 10,
    "left": null,
    "right": {
        "val": 12,
        "left": null,
        "right": null
    }
};

// [ 8, 5, 1, 7, 10, 12 ] true
const treeC = {
    "val": 8,
    "left": {
        "val": 5,
        "left": {
            "val": 1,
            "left": null,
            "right": null
        },
        "right": {
            "val": 7,
            "left": null,
            "right": null
        }
    },
    "right": {
        "val": 10,
        "left": null,
        "right": {
            "val": 12,
            "left": null,
            "right": null
        }
    }
}

// not BST
const treeD = {
    "val": 1,
    "left": {
        "val": 3,
        "left": {
            "val": 9,
            "left": null,
            "right": null
        },
        "right": {
            "val": 6,
            "left": null,
            "right": null
        }
    },
    "right": {
        "val": 4,
        "left": null,
        "right": null
    }
}

module.exports = { treeA, treeB, treeC, treeD }

