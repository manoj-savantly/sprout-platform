package net.savantly.sprout.module.forms;

import java.util.Arrays;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;
import net.savantly.sprout.core.module.SproutModuleConfiguration;
import net.savantly.sprout.module.forms.domain.data.FormDataRepository;
import net.savantly.sprout.module.forms.domain.definition.FormDefinitionRepository;

/**
 * 
 * An example of how the 'application.properties' values can be injected at runtime into other beans
 *
 */
@Data
@SproutModuleConfiguration
@ConfigurationProperties("sprout.plugins.forms")
public class FormsModuleConfiguration implements InitializingBean {
	
	private final DataSource dataSource;
	private final List<String> restrictedFormPaths = Arrays.asList("form", "user", "role", "data");
	
	public FormsModuleConfiguration(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Bean
	public FormsApi savantlyFormsApi(FormService formService) {
		return new FormsApi(formService);
	}
	
	@Bean
	public FormService formService(
			FormDefinitionRepository formDefinitionRepository, 
			FormDataRepository formDataRepository, ObjectMapper mapper) {
		return new FormService.FormServiceBuilder()
				.formDataRepository(formDataRepository)
				.formDefinitionRepository(formDefinitionRepository)
				.mapper(mapper)
				.build();
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		SFDBMigration migrator = new SFDBMigration(dataSource);
		migrator.migrate();
	}

}
