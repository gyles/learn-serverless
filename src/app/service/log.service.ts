interface LogService {
    create(item: object[]): Promise<object>;
    find(rsql: string): Promise<object>;
}
