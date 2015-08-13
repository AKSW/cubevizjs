namespace CubeViz
{
    export interface View
    {
        destroy(): void;
        initialize(): void;
        render(): void;
    }
}
