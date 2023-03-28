export interface DataHashService{
    hash(data: any): Promise<string>;

    compare(data: any, hash: string): Promise<boolean>;
}