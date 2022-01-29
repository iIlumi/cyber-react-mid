// các action bình thường vẫn chia để riêng ra,
// Saga chỉ qản lý riêng các action saga (dispatch function)
// Khác với thunk vẫn để chung với các action bình thường
export function* rootSaga() {
  console.log('rootSaga');
}
