export interface SimpleStatisticItem {
    name: string;
    value: string;
}

export interface StatisticItem {
    name: string;
    type: "StatisticItem";
    value: string;
}

export interface MapStatisticItem {
    name: string;
    type: "MapStatisticItem";
    value: SimpleStatisticItem[];
}

export interface RingStatisticItem {
    name: string;
    type: "RingStatisticItem";
    size: number;
    value: SimpleStatisticItem[];
}
