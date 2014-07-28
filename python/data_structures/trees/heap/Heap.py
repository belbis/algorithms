__author__ = 'mike@belbis.com'

# standard imports
from sys import path

# hack for sibling imports
path.append('..')

# local imports
from abstract import Tree
from abstract import Node


class Heap(Tree):
    """
        a Heap is a specialized tree-based data structure that satisfies the heap property:
        If A is a parent Node of B then the key of node A is ordered with respect to the key of
        node B with the same ordering applying across the heap.
        :param: nodes - an iterable containing HeapNodes or items
        :param: max_children - determines max number of children a node can have
        :param: max_heap - boolean for max heap, min heap
    """
    def __init__(self, nodes=None, max_children=2, max_heap=True):
        super(Heap, self).__init__()
        self._nodes = []
        self._max_children = max_children
        self._max_heap = max_heap
        self._last_inserted = -1
        if nodes is not None:
            for i in nodes:
                if type(i) is HeapNode:
                    self.insert(i)
                else:
                    node = HeapNode(i)
                    self.insert(node)

    def insert(self, node):
        """
        :param node: element to be added to the heap
        :return: the element inserted
        """
        self._nodes.append(node)
        self._last_inserted += 1
        self.percolate_up(self._last_inserted)

    def delete(self, node):
        """
        :param node:
        :return: the node that was deleted, otherwise None
        """

    def find(self, node):
        """
        find searches the heap for the node parameter. the check can be for a node's item
        or just passing in a node
        :param node:
        :return: the node if found, else None
        """
        if type(node) is HeapNode:
            to_find = node.get_item()
        else:
            to_find = node

        for i in self._nodes:
            if i.get_item() == to_find:
                return i
        return None

    def percolate_up(self, idx):
        child = self._nodes[idx]
        parent_index = idx / self._max_children
        parent = self._nodes[parent_index]
        if self._compare(child, parent):
            self._nodes[parent_index] = child
            self._nodes[idx] = parent
            self.percolate_up(parent_index)

    def _compare(self, node1, node2):
        """
        strategy for comparing nodes based on the type of heap (min/max)
        :param node1:
        :param node2:
        :return: Boolean as comparison between nodes
        """
        if self._max_heap:
            return node1.get_item() > node2.get_item()
        else:
            return node1.get_item() < node2.get_item()

    def is_empty(self):
        """
            :return: Boolean on if the Heap is empty
        """
        return len(self._nodes) == 0

    def walk(self):
        """
            :return: iterator that walks through heap
        """
        for i in self._nodes:
            yield i

    def is_max(self):
        """
            simply a method to determine if max-heap
        """
        return self._max_heap

    def get_max_children(self):
        """
            returns the max number of children allowed by the heap
        """
        return self._max_children

    def get_parent(self, node):
        """
            returns the parent node of node otherwise None
        """
        for idx, n in enumerate(self._nodes):
            if n is node:
                return self._nodes[idx / self._max_children]

    def __repr__(self):
        return '\n'.join([
            str([i.get_item() for i in self._nodes]),
            'nodes: ' + str(len(self._nodes)),
            'depth: ' + str(len(self._nodes)/self._max_children + 1),
            'root: ' + str(self._nodes[0].get_item())
        ])


class HeapNode(Node):
    """
        A HeapNode is a Node that is used for the heap
        data structure
    """
    def __init__(self, item):
        super(HeapNode, self).__init__()
        self._item = item

    def get_item(self):
        return self._item

    def set_item(self, item):
        self._item = item