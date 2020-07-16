/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// my sol, recursion
var preorderTraversal = function(root) {
    if (root === null) {return []}
    return [root.val].concat(preorderTraversal(root.left), preorderTraversal(root.right))
};


// alt via leet
function traverse(node, arr) {
    if(node) {
        arr.push(node.val)
    }
    if(node.left) {
        traverse(node.left, arr)
    }
    if(node.right) {
        traverse(node.right, arr)
    }
}

var preorderTraversal = function(root) {
    if(!root) return [];
    let arr = [];
    traverse(root, arr)
    return arr
};

// iterative:
/*
public List<Integer> preorderTraversal(TreeNode node) {
	List<Integer> list = new LinkedList<Integer>();
	Stack<TreeNode> rights = new Stack<TreeNode>();
	while(node != null) {
		list.add(node.val);
		if (node.right != null) {
			rights.push(node.right);
		}
		node = node.left;
		if (node == null && !rights.isEmpty()) {
			node = rights.pop();
		}
	}
    return list;

public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> result = new LinkedList<>();
    Deque<TreeNode> stack = new LinkedList<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        if (node != null) {
            result.add(node.val);
            stack.push(node.right); // if(node.right != null) stack.push(node.right);
            stack.push(node.left);
        }
    }
    return result;
}

public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        List<Integer> list = new ArrayList<>();
        TreeNode cur = root;
        while(!stack.isEmpty() || cur != null){
            while(cur != null){
                list.add(cur.val);
                stack.push(cur);
                cur = cur.left;
            }
            cur = stack.pop();
            cur = cur.right;
        }
        return list;
    }
}

the idea is from in order traversal 
one line difference!
public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        List<Integer> list = new ArrayList<>();
        TreeNode cur = root;
        while(!stack.isEmpty() || cur != null){
            while(cur != null){
                stack.push(cur);
                cur = cur.left;
            }
            cur = stack.pop();
            list.add(cur.val);
            cur = cur.right;
        }
        return list;
    }
}

} */