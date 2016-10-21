/**
 * Created by NowhereToRun on 2016/10/19.
 */
function binarySearch(list, target) {
    var low = 0, high = list.length - 1;
    while (low <= high) {
        var mid = parseInt((low + high) / 2);
        if (list[mid] > target) {
            high = mid - 1;
        }
        else if (list[mid] < target) {
            low = mid + 1;
        }
        else {
            return mid;
        }
    }
    return -1;
}

function binarySearchUpperBound(list, target) {
    var low = 0, high = list.length - 1;
    if (target >= list[high]) {
        return -1;
    }
    var mid = parseInt((low + high) / 2);
    while (high > low) {
        if (list[mid] > target) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
        mid = parseInt((low + high) / 2);
    }
    return mid;
}

function binarySearchLowerBound(list, target) {
    var low = 0, high = list.length - 1;
    if (target <= list[0]) {
        return -1
    }
    var mid = Math.ceil((low + high) / 2);
    while (low < high) {
        if (list[mid] < target) {
            low = mid;
        }
        else {
            high = mid - 1;
        }
        mid = Math.ceil((low + high) / 2);
    }
    return mid;
}

function rotateArrayBinarySearch(list, target) {
    var low = 0, high = list.length-1;
    while (low <= high) {
        var mid = Math.floor((high + low) / 2);
        if (target < list[mid]) {
            if (list[mid] < list[high]) {//说明高位（mid右侧）肯定是顺序的
                high = mid - 1;
            } else {//说明低位（mid左侧）肯定是顺序的
                if (target < list[low]) { //target比mid左侧所有都小
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        } else if (target > list[mid]) {
            if (list[mid] > list[low]) {
                low = mid + 1;
            } else {
                if (list[high] < target) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
        } else {
            return mid;
        }
    }
    return -1;
}
