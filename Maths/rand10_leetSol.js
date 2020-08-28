// Found this method as fastest js submission
// It's called rejection sampling
// in a 7 by 7 grid, number the squares 1..49
// Each has an equal chance of being chosen

var rand10 = function() {    
    let idx = -1;
    
    while (true) {        
        const row = rand7();
        const col = rand7();
        
        idx = col + (row - 1) * 7;
        
        if (idx <= 40) {
            return 1 + (idx - 1) % 10;
        }
    }
};

// lower the number of expected calls from 2.45 to 2.2123
/*
class Solution {
public:
    int rand10() {
        int a, b, idx;
        while (true) {
            a = rand7();
            b = rand7();
            idx = b + (a - 1) * 7;
            if (idx <= 40)
                return 1 + (idx - 1) % 10;
            a = idx - 40;
            b = rand7();
            // get uniform dist from 1 - 63
            idx = b + (a - 1) * 7;
            if (idx <= 60)
                return 1 + (idx - 1) % 10;
            a = idx - 60;
            b = rand7();
            // get uniform dist from 1 - 21
            idx = b + (a - 1) * 7;
            if (idx <= 20)
                return 1 + (idx - 1) % 10;
        }
    }
};
*/


// an alternative:
/*
int
rand10(void)
{
	int a, b;

	do a = rand7(); while (a == 7);
	do b = rand7(); while (b > 5);

	return a & 1 ? b : b + 5;
}
*/
