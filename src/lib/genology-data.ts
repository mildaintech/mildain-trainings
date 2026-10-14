export interface GenologyNodeData {
    id: string;
    level: number;
    children?: GenologyNodeData[];
  }
  
  const genologyTreeData: GenologyNodeData = {
    id: 'root',
    level: 0,
    children: [
      {
        id: 'child-1',
        level: 1,
        children: [
          { id: 'grandchild-1-1', level: 2 },
          { id: 'grandchild-1-2', level: 2 },
        ],
      },
      {
        id: 'child-2',
        level: 1,
        children: [
            { id: 'grandchild-2-1', level: 2 },
            { id: 'grandchild-2-2', level: 2 },
        ],
      },
      {
        id: 'child-3',
        level: 1,
        children: [
            { id: 'grandchild-3-1', level: 2 },
            { id: 'grandchild-3-2', level: 2 },
        ],
      },
      {
        id: 'child-4',
        level: 1,
        children: [
            { id: 'grandchild-4-1', level: 2 },
            { id: 'grandchild-4-2', level: 2 },
        ],
      },
      {
        id: 'child-5',
        level: 1,
        children: [
            { id: 'grandchild-5-1', level: 2 },
            { id: 'grandchild-5-2', level: 2 },
        ],
      },
    ],
  };
  
  export const getGenologyData = (): GenologyNodeData => {
    return genologyTreeData;
  };
  