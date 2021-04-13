
export interface Order {
    id: number;
    order_date: string;
    delivery_date: string;
    inventories: any;
    priority: {
        id: number;
        name: string;
    };
    state_order: {
        id: number;
        name: string;
    };
  }