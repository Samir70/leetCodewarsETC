var detectCycle = function (head) {
    if (head === null) { return null }
    let rabbit = head.next, turtle = head;
    if (rabbit === null) { return null }
    let turtleSteps = 0;
    while (rabbit !== turtle) {
        if (rabbit.next === null || rabbit.next.next === null) { return null }
        rabbit = rabbit.next.next;
        turtle = turtle.next
        turtleSteps++;
    }

    let findEntry = head;
    turtle = turtle.next;
    while (findEntry !== turtle) {
        turtle = turtle.next;
        findEntry = findEntry.next;
    }
    return findEntry
};

//refactored:
/**
 * If we use turtle and rabbit both starting at head, 
 * then distance from start for (t, r) = (i, 2i)
 * So when they meet after i steps, 
 * imagine the turtle's journey 
 *  -- part of it is on the loop and part before the loop
 *  so i = preLoop + onLoop
 * but 2i = preLoop + onLoop + n*cycleLength
 * since the rabbit got to the meeting point, then went round and round the loop a few times.
 * 
 * so i is a multiple of the cycleLength
 * The turtle may not have gone round the loop at all, but wherever it stopped: 
 * to complete the next loop it must travel preLoop steps.
 */

// NB: this is Floyd's algorithm
const detectCycle = (head) => {
    if (head === null || head.next === null || head.next.next === null) { return null }
    let turtle = head, rabbit = head;
    while (rabbit.next && rabbit.next.next) {
        rabbit = rabbit.next.next;
        turtle = turtle.next;
        if (rabbit === turtle) { break }
    }
    if (rabbit !== turtle) { return null }
    rabbit = head;
    while (rabbit !== turtle) {
        rabbit = rabbit.next;
        turtle = turtle.next;
    }
    return rabbit
}