let texts = [];
let textAr = document.querySelector('textarea');
let btnSave = document.querySelector('.text__btn');
let btnCreate = document.querySelector('.create__btn');
let list = document.querySelector('.notes');
let i = 1;


btnSave.addEventListener('click', function () {

	let data = this.dataset.mode;

	if (data == 'create') {

		let li = document.createElement('li');
		list.appendChild(li);
		let str = textAr.value;
		texts.push(str);
		let item = document.createElement('span');
		item.textContent = 'запись ' + i;
		item.classList.add('notes__item');
		item.dataset.key = i;
		li.appendChild(item);
		textAr.value = '';
		i++;

		let btnRemove = document.createElement('span');
		btnRemove.textContent = 'Х';
		btnRemove.classList.add('item__close');
		li.appendChild(btnRemove);

		btnRemove.addEventListener('click', function () {
			li.remove();
		})

		let items = document.querySelectorAll('.notes__item');

		items.forEach(function (item) {

			item.addEventListener('click', function () {
				textAr.value = texts[this.dataset.key - 1];

				items.forEach(function (item) {
					if (item.classList == 'notes__item notes__item--active') {
						item.classList.remove('notes__item--active');
					}
				})

				this.classList.add('notes__item--active');
				btnSave.setAttribute('data-mode', 'update');
				btnSave.setAttribute('data-lock', this.dataset.key);

				if (btnCreate.classList != 'create__btn') {
					btnCreate.classList.remove('notes__item--active')
				}
			})
		})

	} else {
		str = textAr.value;
		texts[btnSave.dataset.lock - 1] = str;
		console.log(texts);
	}

	btnCreate.addEventListener('click', createNewItem);
	function createNewItem() {
		btnSave.setAttribute('data-mode', 'create');
		textAr.value = '';
	}
})