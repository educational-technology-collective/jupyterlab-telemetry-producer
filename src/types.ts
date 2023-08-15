import { KernelError, NotebookPanel } from "@jupyterlab/notebook";

export interface IConfig {
    activeEvents: string[];
    logNotebookContentEvents: string[];
}

export interface ICellMeta {
    index: number;
    id: any;
}

export interface INotebookEventOptions {
    notebookPanel: NotebookPanel;
    config: IConfig;
}

export interface INotebookEventMessage {
    eventType: string;
    eventName: string;
    cells: Array<ICellMeta>;
    notebookPanel: NotebookPanel;
    kernelError?: KernelError | null | undefined;
    selection?: string;
    meta?: any;
    environ?: object,
    message?: any
}