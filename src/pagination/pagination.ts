
export const resUserPerPage = 4;

export class PaginationPerPage {

  getPage(currentPage: number, resPerPage: number): number {
    return resPerPage * (currentPage - 1);
  }
};
