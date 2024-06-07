import { CustomFilterPipe } from "./custom-filter-pipe.pipe";
describe('CustomFilterPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
