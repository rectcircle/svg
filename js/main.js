(function () {
	const mainSvg = document.getElementById('mainSvg');
	/*拖拽实现*/
	(function () {
		let targetElement = null;
		let startTargetClientX = 0;
		let startTargetClientY = 0;
		let startMetric = {}; // a: 像素比坐标，e：x轴坐标偏移量，f：y轴坐标偏移量
		function findAtomicElement(ele) {
			if (ele.tagName === 'svg') {
				return null;
			}
			if (ele.classList.contains('diagram-atomic-element')) {
				return ele;
			}
			return findAtomicElement(ele.parentElement);
		}
		mainSvg.addEventListener('mousedown', (e) => {
			if (e.target !== mainSvg) {
				targetElement = findAtomicElement(e.target)
				if (targetElement === null) {
					return;
				}
				startMetric = targetElement.getCTM();
				startTargetClientX = e.clientX;
				startTargetClientY = e.clientY;
			}
		})
	
		mainSvg.addEventListener('mousemove', (e) => {
			if (targetElement !== null) {
				const newX = (startMetric.e + e.clientX - startTargetClientX) / startMetric.a;
				const newY = (startMetric.f + e.clientY - startTargetClientY) / startMetric.a;
				targetElement.setAttributeNS(null, "transform", "translate(" + newX + "," + newY + ")");
			}
		})
	
		mainSvg.addEventListener('mouseup', (e) => {
			targetElement = null;
		})
	})();

	const atomicElements = document.querySelector('.diagram-atomic-element');
})();