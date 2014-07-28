__author__ = 'mike@belbis.com'

# standard imports
import unittest
import random

# local imports
from Heap import Heap
from Heap import HeapNode


def gen_rand():
    return int(random.random() * 10)+1


class TestHeap(unittest.TestCase):
    """
        set of test cases for the Heap
    """

    def _check_heap(self):
        """
            walks through the heap and verifies the condition
        """
        for i in self.heap.walk():
            parent = self.heap.get_parent(i)
            if self.heap.is_max():
                self.assertLessEqual(i.get_item(), parent.get_item())
            else:
                self.assertGreaterEqual(i.get_item(), parent.get_item())

    def test_init_max_heap(self):
        n1 = gen_rand()
        n2 = gen_rand()
        self.heap = Heap(nodes=[n1, n2], max_children=2, max_heap=True)
        self._check_heap()

    def test_init_min_heap(self):
        n1 = gen_rand()
        n2 = gen_rand()
        self.heap = Heap(nodes=[n1, n2], max_children=2, max_heap=False)
        self._check_heap()


    def test_insert_max_heap(self):
        nodes = [gen_rand() for i in xrange(10)]
        self.heap = Heap(nodes=nodes, max_children=gen_rand(), max_heap=True)
        self._check_heap()

    def test_insert_min_heap(self):
        nodes = [gen_rand() for i in xrange(10)]
        self.heap = Heap(nodes=nodes, max_children=gen_rand(), max_heap=False)
        self._check_heap()

    def test_delete_max_heap(self):
        nodes = [gen_rand() for i in xrange(10)]
        node_to_delete = HeapNode(gen_rand())
        nodes.append(node_to_delete)
        self.heap = Heap(nodes=nodes, max_children=gen_rand(), max_heap=True)
        self.heap.delete(node_to_delete)
        self._check_heap()

    def test_delete_min_heap(self):
        nodes = [gen_rand() for i in xrange(10)]
        node_to_delete = HeapNode(gen_rand())
        nodes.append(node_to_delete)
        self.heap = Heap(nodes=nodes, max_children=gen_rand(), max_heap=False)
        self.heap.delete(node_to_delete)
        self._check_heap()


if __name__ == '__main__':
    unittest.main()