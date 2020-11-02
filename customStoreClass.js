const _state = new WeakMap();
const _listners = Symbol();
const _reducer = new WeakMap();

class CreateStore {
  constructor(reducer) {
    _reducer.set(this, reducer);
    // _state.set(this);
    this[_listners] = [];
  }

  getState() {
    return _state.get(this);
  }

  dispatch(action) {
    const reducer = _reducer.get(this);
    _state.set(this, reducer(_state.get(this), action));

    for (let listner of this[_listners]) {
      listner();
    }
  }

  subscribe(listner) {
    this[_listners].push(listner);
  }
}

export default CreateStore;
