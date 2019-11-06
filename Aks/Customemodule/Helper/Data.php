<?php
namespace Aks\Customemodule\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper {
	
	/**
	 * @param \Magento\Framework\App\Helper\Context $context
	 */
	public function __construct(
		\Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
		\Magento\Catalog\Model\CategoryFactory $categoryFactory,
		\Magento\Framework\App\Helper\Context $context
	) {
		$this->_categoryFactory = $categoryFactory;
		$this->_productCollectionFactory = $productCollectionFactory;
		parent::__construct($context);
	}
	public function getProductCollection($categoryid) {
		$categoryId = $categoryid;
		$category = $this->_categoryFactory->create()->load($categoryId);
		$collection = $this->_productCollectionFactory->create();
		$collection->addAttributeToSelect('*');
		$collection->addCategoryFilter($category);
		$collection->addAttributeToFilter('visibility', \Magento\Catalog\Model\Product\Visibility::VISIBILITY_BOTH);
		$collection->addAttributeToFilter('status', \Magento\Catalog\Model\Product\Attribute\Source\Status::STATUS_ENABLED);
		return $collection;
	}
}