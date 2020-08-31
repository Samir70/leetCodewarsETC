// via leetcode
/**
 * def deleteNode(root, key):
	if not root: # if root doesn't exist, just return it
		return root
	if root.val > key: # if key value is less than root value, find the node in the left subtree
		root.left = deleteNode(root.left, key)
	elif root.val < key: # if key value is greater than root value, find the node in right subtree
		root.right= deleteNode(root.right, key)
	else: #if we found the node (root.value == key), start to delete it
		if not root.right: # if it doesn't have right children, we delete the node then new root would be root.left
			return root.left
		if not root.left: # if it has no left children, we delete the node then new root would be root.right
			return root.right
               # if the node have both left and right children,  we replace its value with the minmimum value in the right subtree and then delete that minimum node in the right subtree
		temp = root.right
		mini = temp.val
		while temp.left:
			temp = temp.left
			mini = temp.val
		root.val = mini # replace value
		root.right = deleteNode(root.right,root.val) # delete the minimum node in right subtree
	return root
 */

var deleteNode = function(root, key) {
    if (!root) return null
    if (root.val == key){
        if (!root.left && !root.right) return null
        if (!root.right) return root.left
        let replacer = traverse(root.right)
        root.val = replacer.val
        root.right = deleteNode(root.right, replacer.val)
        return root
    }
    if (root.val>key) root.left = deleteNode(root.left, key)
    if (root.val<key) root.right = deleteNode(root.right, key)
    return root
};

var traverse = function(node){
    while(node.left) node = node.left
    return node
}