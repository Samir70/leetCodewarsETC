class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> out;
        int i = 0;
        while (i < nums.size()) {
            int start = nums[i], end = nums[i];
            i++;
            while (i < nums.size() && nums[i] == end+1) {
                end++;
                i++;
            }
            out.push_back(start == end ? to_string(start) : to_string(start) + "->" + to_string(end));
        }
        return out;
    }
};