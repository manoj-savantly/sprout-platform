package net.savantly.sprout.domain.menu;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.savantly.sprout.core.domain.menu.Menu;
import net.savantly.sprout.core.domain.menu.MenuRepository;

public class MenuService {

	private static final Logger log = LoggerFactory.getLogger(MenuFixture.class);
	private final MenuRepository repository;
	private final List<MenuContributor> menuContributors;
	
	public MenuService(MenuRepository repository, List<MenuContributor> menuContributors) {
		this.repository = repository;
		 menuContributors.sort(Comparator.comparing(MenuContributor::getPriority));
		 this.menuContributors = menuContributors;
	}
	
	/**
	 * Gets the root menus with any contributions from plugins
	 * @return
	 */
	public List<MenuDto> getRootMenus() {
		List<MenuDto> dtos = toDto(this.repository.findRootMenus());
		menuContributors.forEach(contributor -> contributor.contribute(dtos));
		return dtos;
	}

	/**
	 * Gets the root menus with optional contributions from plugins
	 * @param withContributions Should plugin contributions be included?
	 * @return
	 */
	public List<MenuDto> getRootMenus(boolean withContributions) {
		if(withContributions) {
			return getRootMenus();
		} else {
			return toDto(this.repository.findRootMenus());
		}
	}

	public void upsertMenus(List<MenuDto> menus){
		final List<Menu> menuEntities = new ArrayList<>();
		menus.forEach(m -> {
			MenuDto parentMenu = null;
			// check for parent
			if(Objects.nonNull(m.getParentName())) {
				List<Menu> foundParent = repository.findByName(m.getParentName());
				if(!foundParent.isEmpty()) {
					parentMenu = toDto(foundParent.get(0));
				}
			}
			addIfMissing(m, parentMenu, menuEntities);
		});
		repository.saveAll(menuEntities);
	}

	public void deleteMenu(String name) {
		final List<Menu> foundMenus = repository.findByName(name);
		final List<Menu> menusToDelete = new ArrayList<>();
		if (!foundMenus.isEmpty()) {
			Menu menu = foundMenus.get(0);
			menusToDelete.add(menu);
			menusToDelete.addAll(repository.findByParentName(menu.getName()));
		}
		repository.deleteAll(menusToDelete);
	}
	
	public void deleteMenuById(String id) {
		repository.deleteById(id);
	}
	
	private List<MenuDto> toDto(List<Menu> menus) {
		final List<MenuDto> dtos = new ArrayList<>();
		menus.forEach(m -> {
			dtos.add(toDto(m));
		});
		return dtos;
	}
	
	private MenuDto toDto(Menu menu) {
		return new MenuDto().setChildren(getChildren(menu))
				.setDisplayText(menu.getDisplayText())
				.setName(menu.getName())
				.setParentName(menu.getParentName())
				.setIcon(menu.getIcon())
				.setUrl(menu.getUrl())
				.setPosition(menu.getPosition());
	}

	private List<MenuDto> getChildren(Menu menu) {
		final List<Menu> foundMenus = repository.findByParentName(menu.getName());
		final List<MenuDto> dtos = new ArrayList<>();
		foundMenus.forEach(m -> {
			dtos.add(toDto(m));
		});
		return dtos;
	}
	
	// Recursive function to add nested menus
	private void addIfMissing(MenuDto m, MenuDto parent, List<Menu> menuEntities) {
		final List<Menu> existing = this.repository.findByName(m.getName());
		Menu menu = null;
		if (existing.isEmpty()) {
			log.info("adding property from config: " + m.getName() + ":\"" + m.getUrl() + "\"");
			menu = new Menu().set_public(true).setDisplayText(m.getDisplayText()).setUrl(m.getUrl()).setName(m.getName());
		} else {
			menu = existing.get(0);
			menu.set_public(true)
				.setDisplayText(m.getDisplayText())
				.setUrl(m.getUrl())
				.setName(m.getName())
				.setIcon(m.getIcon())
				.setPosition(m.getPosition());
			menuEntities.add(menu);
		}
		if (Objects.nonNull(parent)) {
			menu.setParentName(parent.getName());
		}
		m.getChildren().stream().filter(c -> Objects.nonNull(c)).forEach(c -> {
			addIfMissing(c, m, menuEntities);
		});
		menuEntities.add(menu);
	}
}
