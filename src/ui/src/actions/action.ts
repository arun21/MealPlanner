export interface IAction<TParams> {
    execute(params: TParams): Promise<void>;
}