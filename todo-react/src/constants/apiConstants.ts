export const BASE_URL: string = 'http://127.0.0.1:3001'
export const ENDPOINTS: IEndpoints = {
  addItem: '/add-item',
  removeItem: '/remove-item',
  editItem: '/edit-item',
  toggleItem: '/toggle-item',
  toggleAllItems: '/toggle-all-items',
  removeCompletedItems: '/remove-completed-items',
  home: '/home'
}

interface IEndpoints {
  addItem: string
  removeItem: string
  editItem: string
  toggleItem: string
  toggleAllItems: string
  removeCompletedItems: string
  home: string
}